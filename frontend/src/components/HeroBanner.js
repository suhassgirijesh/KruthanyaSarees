import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="relative min-h-[82vh] luxury-surface overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[linear-gradient(115deg,transparent_0%,rgba(201,166,70,0.12)_22%,transparent_45%,rgba(248,245,238,0.08)_64%,transparent_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 min-h-[82vh] grid lg:grid-cols-[1fr_0.9fr] items-center gap-10 py-12">
        <div>
          <p className="uppercase text-gold-soft text-xs mb-5">
            Handpicked luxury drapes
          </p>
          <h1 className="text-soft-white font-luxury text-5xl md:text-7xl font-bold mb-5 leading-tight">
            KRUTHANYA SAREES
          </h1>
          <p className="text-soft-white/75 text-lg md:text-2xl mb-8 max-w-2xl">
            Cinematic silks, graceful cottons, and wedding heirlooms crafted for celebrations that linger.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Shop Collection
            </Link>
            <Link to="/products?category=Wedding%20Sarees" className="btn-outline">
              Cotton Edition
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-gold/30 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#5b1020_0%,#170b0b_32%,#c9a646_33%,#c9a646_36%,#10100f_37%,#111_62%,#7a1230_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[repeating-linear-gradient(90deg,rgba(248,245,238,0.16)_0_1px,transparent_1px_18px)]" />
            <div className="absolute inset-8 border border-gold/40 rounded-lg" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-gold-soft font-luxury text-3xl">Banarasi glow, modern poise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
