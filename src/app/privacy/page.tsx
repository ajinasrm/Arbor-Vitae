export const metadata = { title: 'Privacy Policy | Arbor Vitae' };
export default function PrivacyPage() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
            <div className="text-center py-14" style={{ background: 'var(--forest-green)' }}>
                <h1 className="font-serif text-5xl text-white">Privacy Policy</h1>
                <p className="text-sm font-sans mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>Last updated: March 2026</p>
            </div>
            <div className="container-lg py-14 max-w-3xl mx-auto">
                <div className="bg-white p-8 md:p-12 space-y-8 font-sans text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {[
                        { title: 'Information We Collect', body: 'We collect information you provide during registration (name, email, phone), purchase information (address, payment method type — we do not store full card numbers), and browsing data to improve your experience.' },
                        { title: 'How We Use Your Information', body: 'We use your information to process orders, send shipping updates, and (with your consent) send marketing communications. We never sell your data to third parties.' },
                        { title: 'Cookies', body: 'We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how users interact with our site. You can opt out of analytics via your browser settings.' },
                        { title: 'Data Security', body: 'All data is transmitted over HTTPS. Payment data is processed via PCI-DSS compliant payment gateways. We perform regular security audits.' },
                        { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@arborvitae.in or use the Account Settings page.' },
                        { title: 'Contact', body: 'For any privacy concerns, email us at privacy@arborvitae.in. We will respond within 48 hours.' },
                    ].map(({ title, body }) => (
                        <div key={title}>
                            <h2 className="font-serif text-2xl mb-2" style={{ color: 'var(--charcoal)' }}>{title}</h2>
                            <p>{body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
