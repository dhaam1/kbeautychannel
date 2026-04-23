"use client";

import React from 'react';
import { motion } from 'motion/react';
import { blogPosts } from '../../constants/column';
import SectionLabel from '../common/SectionLabel';
import { ArrowRight } from 'lucide-react';

export default function ColumnSection() {
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <SectionLabel number="06" title="DR.KIM COLUMN" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              전문 의료진이 전하는<br />
              <span className="text-gray-400">아름다움의 본질</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-md">
              단순한 시술을 넘어, 건강한 피부와 진정한 아름다움을 위한 김연진 원장의 깊이 있는 통찰을 만나보세요.
            </p>
          </motion.div>

          <motion.a
            href="/column"
            className="group flex items-center gap-3 text-sm font-bold tracking-widest text-gray-900 uppercase"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
          >
            View All Columns
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:border-gray-900 group-hover:text-white transition-all duration-300">
              <ArrowRight size={16} />
            </div>
          </motion.a>
        </div>

        {/* Minimal Grid - 시안 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {displayPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-gray-100">
                <img 
                  src={post.id % 2 === 0 ? "/images/column_cover_bg.png" : "/images/column_cover_bg_2.png"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold text-white tracking-wider">
                    {post.category.split(',')[0]}
                  </span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                {post.description}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                Read More <ArrowRight size={12} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

