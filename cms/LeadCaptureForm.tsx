import { contentType, type ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import { authoringMetadata } from './authoringMetadata';
import { blockWidth, widthClass } from './blockWidth';
import { expandReferences, previewContextOf } from './expandRefs';

/**
 * Form Field — a single visual form field nested inside a Lead Capture Form's
 * FormFields area. A plain `_component` (no composition behavior): added via the
 * FormFields block picker, not dropped on the canvas.
 */
export const FormFieldContentType = contentType({
  key: 'FormFieldBlock',
  baseType: '_component',
  displayName: 'Form Field (v1)',
  description: 'A single form input: label, field type and required flag.',
  properties: {
    Label: {
      type: 'string',
      displayName: 'Label',
      description: 'Field label. generate · brand_guidelines · required.',
      isRequired: true,
      isLocalized: true,
      sortOrder: 10,
    },
    FieldType: {
      type: 'string',
      displayName: 'Field Type',
      description: 'Input type. select · privacy_review.',
      isLocalized: true,
      sortOrder: 20,
      enum: [
        { value: 'text', displayName: 'Text' },
        { value: 'email', displayName: 'Email' },
        { value: 'tel', displayName: 'Phone' },
        { value: 'select', displayName: 'Picklist' },
        { value: 'checkbox', displayName: 'Checkbox' },
      ],
    },
    IsRequired: {
      type: 'boolean',
      displayName: 'Required',
      description: 'Whether the field is required. Default: off.',
      isLocalized: true,
      sortOrder: 30,
    },
  },
});

/**
 * Lead Capture Form — captures interest and routes leads into Marketo.
 * FormFields is a ContentArea (array of `content`) of Form Field blocks.
 * Rendered as a STATIC form here; actual Marketo submission wiring is out of
 * scope for this scaffold. Properties per demo-notes/052a.
 */
export const LeadCaptureFormContentType = contentType({
  key: 'LeadCaptureFormBlock',
  baseType: '_component',
  displayName: 'Lead Capture Form (v1)',
  description: 'A Marketo-routed lead form with a title, configurable fields and a success redirect.',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    ...blockWidth(),
    FormTitle: {
      type: 'string',
      displayName: 'Form Title',
      description: 'Form legend / heading. generate · brand_guidelines · ≤80 chars.',
      maxLength: 80,
      isLocalized: true,
      sortOrder: 10,
    },
    MarketoProgramID: {
      type: 'string',
      displayName: 'Marketo Program ID',
      description: 'Marketo campaign routing id. select · external_system · required · marketing_ops review.',
      isRequired: true,
      isLocalized: true,
      sortOrder: 20,
    },
    // Reference list (not an inline ContentArea): element-enabled blocks may not
    // hold a `content` area, so fields are references to Form Field blocks,
    // expanded at render via expandReferences.
    FormFields: {
      type: 'array',
      displayName: 'Form Fields',
      description: 'Form Field blocks. suggest · privacy_review · 2–8 items · pii_review required.',
      isLocalized: true,
      minItems: 2,
      maxItems: 8,
      items: {
        type: 'contentReference',
        allowedTypes: [FormFieldContentType],
      },
    },
    SubmitButtonText: {
      type: 'string',
      displayName: 'Submit Button Text',
      description: 'Submit button label. generate · brand_guidelines · ≤28 chars.',
      maxLength: 28,
      isLocalized: true,
      sortOrder: 30,
    },
    SuccessRedirectPage: {
      type: 'contentReference',
      displayName: 'Success Redirect Page',
      description: 'Page shown after submit. select · approved_content_only · required.',
      allowedTypes: ['_page'],
      isRequired: true,
      isLocalized: true,
      sortOrder: 40,
    },
    ...authoringMetadata({
      purpose: 'conversion',
      intents: ['enroll', 'request_info', 'contact_sales', 'apply'],
      pageTypes: ['campaign', 'landing', 'grant', 'employer', 'medicare'],
      audiences: ['member', 'employer', 'broker', 'medicare'],
      position: 'late',
      priority: 'high',
      governance: ['marketing_ops_review', 'pii_review'],
    }),
  },
});

type FieldProps = { content: ContentProps<typeof FormFieldContentType> };

/** A single form field. Registered (key `FormFieldBlock`) for FormFields rendering. */
export function FormField({ content }: FieldProps) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  const type = content.FieldType ?? 'text';
  const required = content.IsRequired === true;
  const inputClass =
    'w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-700 outline-none focus:border-blue-600';

  return (
    <div {...pa(block)} className="flex flex-col gap-1.5">
      <label {...pa('Label')} className="text-sm font-semibold text-slate-700">
        {content.Label}
        {required ? <span className="text-[color:var(--color-brand-red)]"> *</span> : null}
      </label>
      {type === 'checkbox' ? (
        <input type="checkbox" disabled className="h-4 w-4" />
      ) : type === 'select' ? (
        <select disabled className={inputClass}>
          <option>Select…</option>
        </select>
      ) : (
        <input type={type} disabled placeholder={content.Label ?? ''} className={inputClass} />
      )}
    </div>
  );
}

type Props = { content: ContentProps<typeof LeadCaptureFormContentType> };

export default async function LeadCaptureForm({ content }: Props) {
  const { pa } = getPreviewUtils(content);
  const block = (content as { __composition?: { key: string } }).__composition;
  // FormFields is a contentReference[]; fetch the full Form Field items.
  const fields = await expandReferences<ContentProps<typeof FormFieldContentType>>(
    content.FormFields as unknown as { key?: string | null }[],
    previewContextOf(content),
  );
  const submitLabel = content.SubmitButtonText || 'Submit';

  return (
    <section {...pa(block)} className="bg-blue-50 px-6 py-16">
      <form
        // Marketo program routing — wiring the actual submit is out of scope here.
        data-marketo-program={content.MarketoProgramID ?? undefined}
        className={`mx-auto rounded-2xl border border-slate-200 bg-white p-8 shadow-sm ${widthClass(content.BlockWidth)}`}
        // Prevent the decorative scaffold form from navigating.
        action="#"
      >
        {content.FormTitle ? (
          <h2 {...pa('FormTitle')} className="mb-6 text-2xl font-bold text-slate-900">
            {content.FormTitle}
          </h2>
        ) : null}
        <div {...pa('FormFields')} className="flex flex-col gap-4">
          {fields.map((field, i) => (
            <FormField key={i} content={field} />
          ))}
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-blue-800 px-6 py-3 font-bold text-white hover:bg-blue-900"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  );
}
