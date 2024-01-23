import styles from './Presentation.module.css';
import React from 'react';

export default function Presentation({ handlePage }) {
  return (
    <div>
      <h3
        className={styles.learnMoreButton}
        onClick={handlePage}
      >
        &#x2190; Done
      </h3>
      <p className={styles.paragraph}>
        Image Converter:
      🌈 Transform your images effortlessly with our Image Converter! Convert between various formats like JPEG, PNG, GIF,
      and more. Whether it's resizing or changing formats, we've got you covered. Experience seamless image conversion with just
      a click!

        Image Filter:
        📸 Elevate your photos to a new level with our Image Filter! Add a touch of creativity and uniqueness to your pictures.
        Choose from variety of filters, each crafted to enhance the beauty of your images. Transform ordinary photos into extraordinary masterpieces with ease!

        Document Converter:
        📂 Need to convert documents hassle-free? Our Document Converter is your solution! Effortlessly switch between PDFs and
        Word. Simplify your document handling and save time with our user-friendly converter.
{/* 
        File Sharing:
        🚀 Experience lightning-fast and secure file sharing with our platform! Share files of any size with colleagues,
        friends, or family effortlessly. Enjoy the convenience of real-time collaboration and ensure your data is protected with
        our robust security features. Simplify sharing, amplify efficiency! */}

      </p>
    </div>
  )
}
