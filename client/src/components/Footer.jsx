import React from 'react'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';
const Footer = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}

            className='text-gray-500 text-sm mt-60 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <motion.div initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}

                className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b'>
                <div >
                    <motion.img initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}

                        src={assets.logo} alt="logo" className=' h-8 md:h-9' />
                    <motion.p initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}

                        className='max-w-80 mt-3 '>
                        We are a leading car rental service, providing top-notch vehicles and exceptional customer service. Explore our wide range of cars and enjoy a seamless rental experience.
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}

                        className='flex items-center gap-3 mt-4'>
                        <a href="#"><img src={assets.instagram_logo} alt="" className="w-5" /></a>
                        <a href="#"><img src={assets.facebook_logo} alt="" className="w-5" /></a>
                        <a href="#"><img src={assets.twitter_logo} alt="" className="w-5" /></a>
                        <a href="#"><img src={assets.gmail_logo} alt="" className="w-5" /></a>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap justify-between w-1/2 gap-8" >
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>QUICK LINKS</h2>
                        <ul className='mt-3 flex flex-col gap-1.5 '>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Brows Cars</a></li>
                            <li><a href="#">List Your Car</a></li>
                            <li><a href="#">About us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>RESOURCES</h2>
                        <ul className='mt-3 flex flex-col gap-1.5 '>
                            <li><a href="#">Help Centre</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy </a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>CONTACT</h2>
                        <ul className='mt-3 flex flex-col gap-1.5 '>
                            <li><a href="#">123 Luxry CARS</a></li>
                            <li><a href="#">BOMBAY , INDIA</a></li>
                            <li><a href="#">+91 1234567823</a></li>
                            <li><a href="#">123@gmail.com</a></li>
                        </ul>
                    </div>

                </motion.div>

            </motion.div>
            <hr className='border-gray-300 mt-8' />
            <motion.div initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">My brand</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a> </li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>
                    <li><a href="#">Conditions</a></li>
                </ul>
            </motion.div>
        </motion.div >
    )
}

export default Footer