import img1 from '../../../assets/Featured/image1.png'
import img2 from '../../../assets/Featured/image2.png'
import img3 from '../../../assets/Featured/image3.png'
import img4 from '../../../assets/Featured/image4.png'

const FeaturedSection = () => {
    return (
        <div className="bg-[#3DC673]">
            <div className="max-w-6xl mx-auto p-10">
                <div className="text-center mb-8">
                    <h2 className="uppercase text-4xl font-bold ">we care</h2>
                    <p className="text-xl font-semibold">The More We Care For The Earth, The Better Our Product</p>
                </div>
                <div className="flex justify-center overflow-hidden -space-x-8">
                    <div>
                        <img className='md:max-w-[270px]' src={img1} alt="" />
                    </div>
                    <div className='-ml-18'>
                        <img className='md:max-w-[270px]' src={img2} alt="" />
                    </div>
                    <div className='-ml-18 z-10'>
                        <img className='md:max-w-[270px]' src={img3} alt="" />

                    </div>
                    <div className='-ml-18 z-0'>
                        <img className='md:max-w-[270px]' src={img4} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSection;