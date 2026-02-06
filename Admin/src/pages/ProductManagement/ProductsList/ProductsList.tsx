import { useNavigate } from 'react-router-dom'

const ProductsList = () => {
    const navigate = useNavigate()
    return (
        <>
            <button
                onClick={() => navigate('/create-product')}
                className='bg-blue-500 text-white px-4 py-2 rounded'>Create Product
            </button>
            <div className='mt-4 p-4 border rounded text-center text-black'>ProductsList</div>
        </>
    )
}

export default ProductsList