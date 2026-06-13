import { Heart } from 'lucide-react';

const Testimonial = () => (
  <section className="py-20 bg-blue-50 border-y border-blue-100">
    <div className="container mx-auto px-4 text-center max-w-3xl">
      <Heart className="mx-auto text-blue-800 mb-6" size={40} />
      <h2 className="text-3xl font-serif font-bold italic mb-6">&ldquo;Banner Health isn&rsquo;t just a hospital system; they are part of our family&rsquo;s support network.&rdquo;</h2>
      <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">— The Rodriguez Family, Phoenix AZ</p>
    </div>
  </section>
);

export default Testimonial;
