import styles from 'src/views/Home.module.css'



import HomeCarousel from 'src/components/HomeCarousel.jsx'
import FeaturedTreatments from 'src/components/FeaturedTreatments.jsx'


function Home() {
    return (
        <>
            <main className = {styles.main}>
                
                <HomeCarousel className = {styles.carousel} />

                <FeaturedTreatments className = {styles.featured} />

                <section className = {styles.academy}>

                </section>

            </main>
        </>
    );


}


export default Home;