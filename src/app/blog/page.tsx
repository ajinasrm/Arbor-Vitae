import { BLOG_POSTS } from '@/data/products';
import Link from 'next/link';

export const metadata = { title: 'Journal | Arbor Vitae', description: 'Style guides, brand stories, and curated notes from the team at Arbor Vitae.' };

export default function BlogPage() {
    return (
        <div>
            <div className="text-center py-14" style={{ background: 'var(--forest-green)' }}>
                <p className="text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--soft-gold)' }}>Insights</p>
                <h1 className="font-serif text-5xl text-white">The Journal</h1>
            </div>
            <section className="section-padding" style={{ background: 'var(--cream)' }}>
                <div className="container-lg">
                    {/* Featured */}
                    <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="block group mb-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white overflow-hidden">
                            <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                <img src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-col justify-center p-8 lg:p-12">
                                <span className="text-xs font-sans font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--soft-gold)' }}>{BLOG_POSTS[0].category} — Featured</span>
                                <h2 className="font-serif text-3xl mb-3 group-hover:text-[var(--forest-green)] transition-colors">{BLOG_POSTS[0].title}</h2>
                                <p className="text-sm font-sans leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{BLOG_POSTS[0].excerpt}</p>
                                <p className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>{BLOG_POSTS[0].date} · {BLOG_POSTS[0].readTime}</p>
                            </div>
                        </div>
                    </Link>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {BLOG_POSTS.slice(1).map(post => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white block">
                                <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-sans font-semibold tracking-widest uppercase" style={{ color: 'var(--soft-gold)' }}>{post.category}</span>
                                    <h3 className="font-serif text-2xl mt-1.5 mb-2 group-hover:text-[var(--forest-green)] transition-colors">{post.title}</h3>
                                    <p className="text-sm font-sans leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
                                    <p className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>{post.date} · {post.readTime}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
