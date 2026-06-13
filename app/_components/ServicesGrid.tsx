import { ChevronRight } from 'lucide-react';

const ServicesGrid = () => {
  const services = [
    "Primary Care", "Cardiology", "Cancer Care", "Urgent Care",
    "Pediatrics", "Imaging", "Orthopedics", "Women's Health",
    "Emergency Care", "Physical Therapy", "Telehealth", "Diabetes Care"
  ];

  return (
    <section className="py-20 bg-white" data-cms-component="ServicesGrid">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4" data-cms-field="grid_title">Expertise for every stage of life</h2>
            <p className="text-slate-600" data-cms-field="grid_description">Banner Health offers comprehensive care from routine exams to specialized treatments across our entire network.</p>
          </div>
          <button className="hidden sm:block text-blue-800 font-bold hover:underline">View All Services</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <a key={i} href="#" className="flex items-center justify-between p-5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-800 transition-all font-semibold text-slate-700 border border-transparent hover:border-blue-200">
              {service}
              <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
