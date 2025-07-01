import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CheckCircle, Upload, Scissors, Download, Sparkles, Clock, Target, Zap } from "lucide-react";


export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br   rounded-lg flex items-center justify-center">
                            <Scissors className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xl font- tracking-tight text-gray-900">hooked/ai</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Sign in
                        </Link>
                        <Link href="/signup">
                            <Button className="text-white">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <Badge className="mb-6">
                        AI-Powered Content Creation
                    </Badge>

                    <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
                        Turn Your Podcasts Into
                        <br />
                        <span className="bg-gradient-to-r bg-[#B56E56] bg-clip-text text-transparent"> Viral Clips</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                        Upload your podcast and let AI automatically create engaging short-form clips
                        optimized for YouTube Shorts, TikTok, and Instagram Reels.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link href="/signup">
                            <Button size="lg" className=" hover: text-white px-8 py-3 text-lg">
                                Start Creating Clips
                                <Sparkles className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        {/* <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300">
                            Watch Demo
                        </Button> */}
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            No technical skills required
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            Start with 10 free credits
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            High-quality output
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            From Podcast to Viral Clip in Minutes
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Our AI analyzes your content and creates engaging clips automatically
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Card className="text-center border-0 shadow-lg">
                            <CardHeader>
                                <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Upload className="w-8 h-8 " />
                                </div>
                                <CardTitle className="text-xl">1. Upload Your Podcast</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Drag and drop your audio or video file (up to 500MB)
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="text-center border-0 shadow-lg">
                            <CardHeader>
                                <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 " />
                                </div>
                                <CardTitle className="text-xl">2. AI Finds Viral Moments</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Our AI identifies the most engaging stories and key moments
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="text-center border-0 shadow-lg">
                            <CardHeader>
                                <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Download className="w-8 h-8 " />
                                </div>
                                <CardTitle className="text-xl">3. Download & Share</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Get vertical clips with subtitles, ready for social media
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            Powerful AI Features
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to create professional short-form content
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-3">
                                <Target className="w-8 h-8  mb-2" />
                                <CardTitle className="text-lg">Smart Cropping</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-gray-600 text-sm">
                                    AI detects active speakers and crops video to center on faces
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-3">
                                <Zap className="w-8 h-8  mb-2" />
                                <CardTitle className="text-lg">Auto Subtitles</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-gray-600 text-sm">
                                    Automatically generated subtitles with custom styling
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-3">
                                <Clock className="w-8 h-8  mb-2" />
                                <CardTitle className="text-lg">Perfect Timing</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-gray-600 text-sm">
                                    Clips are optimized for under 1 minute for maximum engagement
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-3">
                                <Sparkles className="w-8 h-8  mb-2" />
                                <CardTitle className="text-lg">Viral Moments</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <p className="text-gray-600 text-sm">
                                    AI identifies the most engaging and shareable content
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing Preview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Pay only for what you use. No subscriptions, no hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <Card className="border-2 border-gray-200">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-lg">Small Pack</CardTitle>
                                <div className="text-3xl font-semibold text-gray-900 mt-2">$9.99</div>
                                <p className="text-gray-600 text-sm">Perfect for small projects</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    50 credits
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    No expiration
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    Downloadable clips
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2  relative">
                            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2  text-white">
                                Most Popular
                            </Badge>
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-lg">Medium Pack</CardTitle>
                                <div className="text-3xl font-semibold text-gray-900 mt-2">$24.99</div>
                                <p className="text-gray-600 text-sm">Best value for regular projects</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    150 credits
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    No expiration
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    Downloadable clips
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-gray-200">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-lg">Large Pack</CardTitle>
                                <div className="text-3xl font-semibold text-gray-900 mt-2">$69.99</div>
                                <p className="text-gray-600 text-sm">Best for large projects</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    500 credits
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    No expiration
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    Downloadable clips
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/signup">
                            <Button size="lg" className=" hover: text-white px-8 py-3">
                                Start with 10 Free Credits
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-black/90 mb-6">
                        Ready to Create Viral Clips?
                    </h2>
                    <p className="text-xl  mb-8 max-w-2xl mx-auto">
                        Join thousands of creators who are already turning their podcasts into engaging short-form content.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" className="bg-white  hover:bg-gray-100 px-8 py-3 text-lg font-semisemfont-semibold">
                            Get Started Free
                            <Sparkles className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section> */}

            {/* Footer */}
            <footer className="bg-gray-900 py-6 text-center text-sm text-gray-400">

                {/* <div className="text-center text-sm text-gray-400"> */}
                <p>&copy; 2025 hooked/ai. All rights reserved.</p>
                {/* </div> */}
            </footer >
        </div >
    );
}
