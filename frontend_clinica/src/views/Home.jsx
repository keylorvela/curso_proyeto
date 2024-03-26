import styles from 'src/views/Home.module.css'
import HomeCarrousel from 'src/components/HomeCarrousel.jsx'

function Home() {
    return (
        <>
            <main className={styles.main}>
                <HomeCarrousel className = {styles.carousel} />
            </main>
        </>
    );


}


export default Home;