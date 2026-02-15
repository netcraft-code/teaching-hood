import React from 'react';
import { Eye, Layers, } from 'lucide-react';
import { HeroImages } from "../assets/images/HeroImages";
import { aboutUsIcons } from "./../assets/icons/about-us/aboutUs"

const AboutUsSection = () => {
  const stats = [
        {
          icon: <img src={aboutUsIcons.teacherConnected} className='w-6 h-6 sm:w-7 sm:h-7' />,
          value: '10,000+',
          label: 'Teachers Connected',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50'
        },
        {
          icon: <img src={aboutUsIcons.schoolRegister} className='w-6 h-6 sm:w-7 sm:h-7' />,
          value: '500+',
          label: 'Schools Registered',
          color: 'text-green-500',
          bgColor: 'bg-green-50'
        },
        {
          icon: <img src={aboutUsIcons.recruiterActive} className='w-6 h-6 sm:w-7 sm:h-7' />,
          value: '50+',
          label: 'Recruiters Active',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50'
        },
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
      icon: <img src={aboutUsIcons.transparency} className='w-7 h-7' />,
      title: 'Transparency',
      description: 'We believe in open and honest communication between all stakeholders in the education ecosystem.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <img src={aboutUsIcons.qualityFirst} className='w-7 h-7' />,
      title: 'Quality First',
      description: 'We focus on onboarding quality educators with institutions that value their skills and dedication.',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: <img src={aboutUsIcons.innovation} className='w-7 h-7' />,
      title: 'Innovation',
      description: 'We continuously improve our platform with cutting-edge technology to serve the education sector better.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: <img src={aboutUsIcons.empowerment} className='w-7 h-7' />,
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
      image: aboutUsIcons.rajeshKumar
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      description: 'Expert in building user-centric platforms',
      image: aboutUsIcons.priyaSharma
    },
    {
      name: 'Amit Patel',
      role: 'Head of Operations',
      description: 'Scaling education solutions across India',
      image: aboutUsIcons.amitPatel
    },
    {
      name: 'Neha Gupta',
      role: 'Head of Partnerships',
      description: 'Building relationships with top schools',
      image: aboutUsIcons.nehGupta
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Teachinghood Founded',
      description: 'Started with a vision to transform teacher hiring in India',
      position: 'left'
    },
    {
      year: '2021',
      title: 'Reached 10,000 Teachers',
      description: 'Crossed the first major milestone of registered educators',
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
      description: 'Launched intelligent matching system for better placements',
      position: 'left'
    }
  ];

  return (
    <div>
        <section className="relative w-full bg-transparent overflow-visible h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px]">
            {/* Background Image Container */}
            <div 
                className="relative w-full bg-cover bg-center overflow-hidden h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px]"
                style={{ backgroundImage: `url(${HeroImages.bg})` }}
            >
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20">
                    {/* Badge */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                            <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                            <span className="text-sm font-regular text-gray-700">About Teachinghood</span>
                        </div>
                    </div>
                    
                    {/* Heading */}
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h1 
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 sm:mb-4 tracking-tight px-4"
                            style={{ 
                                textShadow: `
                                    0px 0px 0px rgba(0, 0, 0, 0.10),
                                    3px 3px 3px rgba(0, 0, 0, 0.10),
                                    3px 4px 4px rgba(0, 0, 0, 0.10),
                                    3px 4px 4px rgba(0, 0, 0, 0.10)
                                `
                            }}
                        >
                            Transforming Education
                        </h1>
                        <h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight px-4"
                            style={{ 
                                textShadow: `
                                    0px 0px 0px rgba(0, 0, 0, 0.10),
                                    3px 3px 3px rgba(0, 0, 0, 0.10),
                                    3px 4px 4px rgba(0, 0, 0, 0.10),
                                    3px 4px 4px rgba(0, 0, 0, 0.10)
                                `
                            }}
                        >
                            Hiring in India
                        </h2>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Half overlap with background image */}
            <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 justify-center sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 mx-12">
                        {stats.map((stat, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl justify-center p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`${stat.bgColor} ${stat.color} w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 my-4 sm:my-4 flex items-center justify-center">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 font-medium flex items-center justify-center">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>

        <div className="py-20 mt-28 mx-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Our Mission */}
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">

                        {/* Decorative Circle */}
                        <img
                            src={aboutUsIcons.missionCircle}
                            alt=""
                            className="
                            absolute
                            top-0
                            right-0
                            translate-x-1/2
                            -translate-y-1/2
                            h-40
                            pointer-events-none
                            "
                        />

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
                                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                                        <img src={aboutUsIcons.ourMissionTick} className="w-3 h-3 flex items-center justify-center" />
                                    </div>

                                    <span className="text-gray-700">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Our Vision */}
                    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        {/* Decorative Circle */}
                        <img
                            src={aboutUsIcons.missionCircle}
                            alt=""
                            className="
                            absolute
                            top-0
                            right-0
                            translate-x-1/2
                            -translate-y-1/2
                            h-40
                            pointer-events-none
                            "
                        />

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
                                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                                        <img src={aboutUsIcons.ourVisionTick} className="w-3 h-3 flex items-center justify-center" />
                                    </div>

                                    <span className="text-gray-700">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="py-20 bg-[linear-gradient(135deg,_#F9FAFB_0%,_rgba(239,246,255,0.5)_100%)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
                        <img src={aboutUsIcons.whatDriveUs} className="w-4 h-4" />
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
                        return (
                            <div
                                key={index}
                                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`${value.bgColor} ${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                                    {value.icon}
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

        {/* <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
                        <img src={aboutUsIcons.meetTheTeam} className="w-4 h-4" />
                        <span className="text-sm font-medium">Meet the Team</span>
                    </div>
                
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Leadership Team
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Passionate professionals committed to transforming education hiring
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="relative overflow-hidden aspect-square">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

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
        </div> */}

        {/* <div className="py-20 bg-[linear-gradient(135deg,_#F9FAFB_0%,_rgba(239,246,255,0.5)_100%)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 bg-white text-green-500 rounded-full px-4 py-2 mb-4">
                        <img src={aboutUsIcons.ourJourney} className="w-4 h-4" />
                        <span className="text-sm font-regular">Our Journey</span>
                    </div>
                
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Milestones
                    </h2>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Key moments that shaped Teachinghood's growth story
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-200 via-blue-400 to-yellow-400" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center ${
                                milestone.position === 'left' 
                                    ? 'justify-start' 
                                    : 'justify-end'
                                }`}
                            >
                                <div
                                    className={`w-6/12 ${
                                        milestone.position === 'left' ? 'pr-12' : 'pl-12'
                                    }`}
                                >
                                    <div
                                        className={`
                                            bg-white border border-gray-200 rounded-2xl p-6 shadow-lg
                                            hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                                            flex flex-col
                                            ${milestone.position === 'left' ? 'items-end text-right' : 'items-start text-left'}
                                        `}
                                    >
                                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-500 rounded-full px-3 py-2 mb-3">
                                            <img src={aboutUsIcons.calender} className="w-3 h-3" />
                                            <span className="text-sm font-regular">{milestone.year}</span>
                                        </div>

                                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                                            {milestone.title}
                                        </h3>

                                        <p className="text-gray-600 text-m leading-relaxed">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-lg z-10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div> */}
    </div>
  );
};

export default AboutUsSection;