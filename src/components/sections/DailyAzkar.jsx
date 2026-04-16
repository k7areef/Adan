import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function DailyAzkar() {
    return (
        <section className="daily-azkar-section py-5 md:py-7" id="dailyAzkar">
            <div className="container">
                <div className="content-wrapper rounded-4xl h-100 bg-primary-dark overflow-hidden relative">
                    {/* Background Image */}
                    <img
                        loading='lazy'
                        fetchPriority='high'
                        alt="Background Image"
                        src={"/daily-azkar-bg.png"}
                        className='w-full h-full object-cover'
                    />
                    {/* Content */}
                    <div className="content-container absolute left-0 top-0 w-full h-full p-5 md:p-10 bg-white/60 flex flex-col justify-end">
                        <h2 className='font-bold text-2xl md:text-3xl xl:text-5xl mb-5'>أذكار الصباح</h2>
                        <p className='text-primary-muted font-semibold'>حافظ علي طمأنينة قلبك بذكر الله "ألا بذكر الله تطمئن القلوب"</p>
                        <Link
                            to='/'
                            className='py-2 md:py-3 px-4 md:px-6 rounded-md bg-primary-dark text-white font-bold flex items-center gap-2 mt-5 w-fit'
                        >
                            <span>اقرأ الان</span>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DailyAzkar;