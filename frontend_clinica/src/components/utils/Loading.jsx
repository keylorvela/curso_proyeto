import Spinner from 'react-bootstrap/Spinner';


/*
use example


const [loading, setLoading] = useState(true);
{loading ? (
            <div className='text-center'>
              <Loading size={15} />
            </div>
          ) : (
            <>
            </>
)}I

useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTreatments();
        setTreatments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

*/


function Loading({ size }) {
  // Convierte el tamaño a una cadena de texto para asignarlo al tamaño del Spinner
  const spinnerSize = `${size}em`;

  return (
    <Spinner animation="border" variant="info" style={{ width: spinnerSize, height: spinnerSize }} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}


export default Loading;