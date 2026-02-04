import React from 'react';
import { Users, Home, Briefcase, CheckCircle, Eye, Star, Lightbulb, Zap, Layers, Check, Calendar } from 'lucide-react';
import { HeroImages } from "../assets/images/HeroImages";

const AboutUsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Teachers Connected',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Home,
      value: '2,500+',
      label: 'Schools Registered',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Briefcase,
      value: '1,000+',
      label: 'Recruiters Active',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: CheckCircle,
      value: '95%',
      label: 'Placement Success',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const missionPoints = [
    'Simplify teacher recruitment',
    'Ensure fair opportunities',
    'Support professional growth'
  ];

  const visionPoints = [
    'Lead education recruitment',
    'Build lasting partnerships',
    'Transform lives through education'
  ];

  const values = [
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We believe in open and honest communication between all stakeholders in the education ecosystem.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Star,
      title: 'Quality First',
      description: 'We focus on onboarding quality educators with institutions that value their skills and dedication.',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology to serve the education sector better.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Zap,
      title: 'Empowerment',
      description: 'We empower teachers to find their ideal roles and schools to discover exceptional educators.',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      description: 'Former educator with 15 years in education technology',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      description: 'Expert in building user-centric platforms',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      description: 'Scaling education solutions across India',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop'
    },
    {
      name: 'Neha Gupta',
      role: 'Head of Partnerships',
      description: 'Building relationships with top schools',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop'
    }
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Teachinghood Founded',
      description: 'Started with a vision to transform teacher hiring in India',
      position: 'left'
    },
    {
      year: '2021',
      title: 'Reached 10,000 Teachers',
      description: 'Crossed the first major milestone in supporting educators',
      position: 'right'
    },
    {
      year: '2022',
      title: 'Expanded to 15 Cities',
      description: 'Grew our presence across major metropolitan areas',
      position: 'left'
    },
    {
      year: '2023',
      title: '50,000+ Success Stories',
      description: 'Successfully connected thousands of teachers with dream jobs',
      position: 'right'
    },
    {
      year: '2024',
      title: 'AI-Powered Matching',
      description: 'Launched intelligent matching system to unite placements',
      position: 'left'
    }
  ];

  return (
    <div>
        <section
            className="w-full bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url(${HeroImages.bg})` }}
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                {/* Badge */}
                <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                    <span className="bg-green-500 w-2 h-2 rounded-full "></span>
                    <span className="text-sm font-regular text-gray-700">About Teachinghood</span>
                </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 tracking-tight">
                        Transforming Education
                    </h1>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
                        Hiring in India
                    </h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className={`${stat.bgColor} ${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                        <Icon className="w-7 h-7" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
        </section>

        <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Our Mission */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                            <Layers className="w-7 h-7 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Mission
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-6">
                            To revolutionize the education hiring landscape in India by creating a 
                            transparent, efficient, and empowering platform that connects 
                            exceptional educators with institutions where they can thrive and make 
                            meaningful impact.
                        </p>

                        <div className="space-y-3">
                            {missionPoints.map((point, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <Check className="w-5 h-5 text-blue-500" />
                                    </div>

                                    <span className="text-gray-700">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Vision */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                            <Eye className="w-7 h-7 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Vision
                        </h3>
                    
                        <p className="text-gray-600 leading-relaxed mb-6">
                            To become India's most trusted education hiring platform, setting new 
                            standards for quality, transparency, and efficiency while empowering 
                            every educator to find their perfect teaching opportunity.
                        </p>

                        <div className="space-y-3">
                            {visionPoints.map((point, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <Check className="w-5 h-5 text-green-500" />
                                    </div>

                                    <span className="text-gray-700">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
                        <Star className="w-4 h-4" />
                        <span className="text-sm font-medium">Our Values</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        What Drives Us
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Our core values guide every decision we make and every feature we build
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = value.icon;

                        return (
                            <div
                                key={index}
                                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`${value.bgColor} ${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                            
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Meet the Team</span>
                    </div>
                
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Leadership Team
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Passionate professionals committed to transforming education hiring
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                
                                <div className="text-sm font-semibold text-blue-600 mb-3">
                                    {member.role}
                                </div>
            
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Our Story</span>
                    </div>
                
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Milestones
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Key moments that shaped Teachinghood's growth story
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-blue-400 to-yellow-400" />

                    {/* Timeline Items */}
                    <div className="space-y-16">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center ${
                                milestone.position === 'left' 
                                    ? 'justify-start' 
                                    : 'justify-end'
                                }`}
                            >

                                {/* Content Card */}
                                <div
                                    className={`w-5/12 ${
                                        milestone.position === 'left' ? 'pr-12' : 'pl-12'
                                    }`}
                                >
                                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        {/* Year Badge */}
                                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-3 py-1 mb-3">
                                            <Calendar className="w-3 h-3" />
                                            <span className="text-xs font-semibold">{milestone.year}</span>
                                        </div>
                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {milestone.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutUsSection;