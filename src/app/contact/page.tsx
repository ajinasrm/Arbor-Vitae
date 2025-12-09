export default function ContactPage() {
    return (
        <div className="bg-background py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-primary mb-6">Contact Us</h1>
                <p className="text-lg text-muted-foreground mb-8">
                    We'd love to hear from you. Whether you have questions about our sustainable practices, need help with sizing, or just want to say hello.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 bg-secondary/10 rounded-lg">
                        <h3 className="text-lg font-medium text-foreground mb-2">Customer Care</h3>
                        <p className="text-muted-foreground">support@arborvitae.com</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <div className="p-6 bg-secondary/10 rounded-lg">
                        <h3 className="text-lg font-medium text-foreground mb-2">Press & Partnerships</h3>
                        <p className="text-muted-foreground">press@arborvitae.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
