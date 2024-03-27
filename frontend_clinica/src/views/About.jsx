import React from 'react';
import image from 'src/assets/Vector.svg';
import styles from 'src/views/About.module.css';

const About = () => {
    return (
        <>
            <div className={styles.imgDiv}>
                <img
                    className={styles.img}
                    src={image}
                    alt="Imagen"
                />
            </div>
        </>
    );
};

export default About;
