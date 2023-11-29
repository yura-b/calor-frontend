import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeAnimation } from '@styles/Animations';
import styles from '@styles/Styles.module.scss';
import AccordionSection from '@components/AccordionSection';

const FAQ: React.FC = () => {
  const initialSectionsState = [
    {
      title: 'Product',
      isOpen: false,
      description: [
        {
          question: 'Where are CALOR products manufactured?',
          answer:
            'CALOR products are proudly manufactured in our state-of-the-art facilities. Our production site are located in Katy, Texas, where we combine traditional craftsmanship with cutting-edge technology to bring you the finest quality footwear.',
        },
        {
          question: 'Are CALOR products customizable?',
          answer:
            'Absolutely! CALOR specializes in custom-made shoes, bags, and accessories. Our innovative customization options allow you to personalize your footwear to reflect your unique style. From choosing materials, colors, and patterns to adding personalized details, you have the freedom to create a one-of-a-kind masterpiece.',
        },
        {
          question: 'Are the material colors displayed on the website accurate representations?',
          answer:
            'While we strive to display our material colors as accurately as possible on our website, please note that there may be slight variations between the colors shown on your screen and the actual product. This is because different monitors and devices may have variations in color settings and display capabilities.',
        },
        {
          question: ' How can I ensure the most accurate representation of material colors?',
          answer:
            'To get the closest representation of the material colors, we recommend to visit our showroom. CALOR 6734 Westheimer Lakes North, Suite 107 Katy, TX 77494',
        },
      ],
    },

    {
      title: 'Orders',
      isOpen: false,
      description: [
        {
          question: 'How long does it take to receive a custom order?',
          answer:
            'Since each CALOR custom order is meticulously made by hand, the production time may vary. On average, the production process takes approximately 7 - 10 business days. Additionally, shipping time depends on your location and selected shipping method. Rest assured, we are dedicated to delivering your custom order as swiftly as possible while maintaining uncompromised quality.',
        },
        {
          question: ' How can I track my order?',
          answer:
            'Once your order is processed and shipped, you will receive a confirmation email with tracking information.',
        },
        {
          question: 'Can I cancel or modify an order after it has been placed?',
          answer:
            'We strive to process and ship orders as quickly as possible. If you need to cancel or modify an order, please reach out to our customer support team immediately. While we cannot guarantee changes or cancellations, we will do our best to accommodate your request.',
        },
      ],
    },

    {
      title: 'Size',
      isOpen: false,
      description: [
        {
          question: 'What shoe sizes do you offer?',
          answer:
            'At CALOR, we offer a comprehensive range of shoe sizes to ensure the perfect fit for our customers. Our sizes range from 6 to 17 in US sizes, which translates to 36 to 47 in EU sizes. We understand that everyone`s feet are unique, and we`re committed to providing a size range that accommodates a variety of foot measurements.',
        },
        {
          question: 'How do I determine my correct shoe size?',
          answer:
            'To find your perfect shoe size, we recommend measuring your feet using a ruler or measuring tape. Start by placing your heel against a wall or straight edge and measure from the back of your heel to the longest toe. Refer to our size chart, which can be found on our website, to match your foot length with the corresponding CALOR shoe size. If you`re still uncertain, our customer support team is here to assist you in finding the right size based on your individual measurements.',
        },
        {
          question: 'Can I provide my individual measurements for a more precise fit?',
          answer:
            'Absolutely! We understand the importance of a perfect fit, and we offer customization options based on individual foot measurements. If you require a precise fit, please reach out to our customer support team, and they will guide you through the process of providing your measurements. We will then tailor your shoes to ensure the ultimate comfort and fit.',
        },
      ],
    },

    {
      title: 'Customer Service',
      isOpen: false,
      description: [
        {
          question: 'How can I contact your customer support team?',
          answer:
            'We`re here to assist you! You can contact our friendly customer support team by email, phone or chat during our business hours. We`re ready to answer your questions, provide assistance, or address any concerns you may have.',
        },
      ],
    },
    {
      title: 'Showroom',
      isOpen: false,
      description: [
        {
          question: 'Can I visit a CALOR showroom?',
          answer:
            'Yes, we have a physical showroom located at: CALOR 6734 Westheimer Lakes North, Suite 107 Katy, TX 77494 To ensure that we can provide you with personalized attention and an optimal shopping experience, we kindly ask that you schedule an appointment to visit our showroom. Please contact our customer support team to arrange a suitable date and time for your visit.',
        },
        {
          question: 'Why do I need to visit your showroom?',
          answer:
            'Our showroom offers an opportunity to explore our products up close, try them on, and receive expert guidance from our knowledgeable staff. Whether you`re looking to create a custom order or simply want to browse our collection, we`re here to assist you in finding the perfect footwear.',
        },
        {
          question: 'How to make an appointment?',
          answer:
            'To make an appointment or inquire about our showroom offerings, please reach out to our customer support team. We can`t wait to welcome you to our showroom and make your CALOR experience truly exceptional!',
        },
      ],
    },
    {
      title: 'General',
      isOpen: false,
      description: [
        {
          question: 'How can I stay updated with CALOR news and promotions?',
          answer:
            'To stay in the loop, we encourage you to subscribe to our newsletter. By subscribing, you will receive exclusive updates, product releases, promotions, and insider information. You can easily sign up for our newsletter on our website and join our vibrant community.',
        },
      ],
    },
  ];

  const [sections, setSections] = useState(initialSectionsState);

  const toggleSection = (index) => {
    setSections((prevSections) =>
      prevSections.map((section, i) => (i === index ? { ...section, isOpen: !section.isOpen } : section))
    );
  };

  return (
    <motion.div {...fadeAnimation} id="FAQ">
      <div className="lg:flex flex-col items-center justify-between mb-2 lg:mb-6">
        <h1 className={`${styles.header1} text-center border-b border-gray w-full`}>FAQ</h1>
        {sections.map((section, index) => (
          <AccordionSection
            key={section.title}
            title={section.title}
            // title={section.question}
            isOpen={section.isOpen}
            toggleAccordion={() => toggleSection(index)}
          >
            <div>
              {section?.description?.map((item, i) => (
                <>
                  <p className={'font-bold text-gray'}>
                    {i + 1}. {item.question}
                  </p>
                  <p className={' pb-2 '}>{item.answer}</p>
                </>
              ))}
            </div>
            <p>{section.answer}</p>
          </AccordionSection>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
