/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import pg2 from '../../assets/2.png'
import pg3 from '../../assets/3.png'
import useAuth from '../../Hooks/useAuth';
const Banner = () => {
    const {user} = useAuth();
    return (
        <div>
            <section>
                <div className="bg-gray-900 text-white py-20">
                    <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
                        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                            <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">ToDo List</h1>
                            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Unlock Your Potential: Transform Your Day with Our Todo List App
                            </h2>
                            <p className="text-sm md:text-base text-gray-50 mb-4">The Ultimate Todo List App is Here.
                            Experience the Power of Our Todo List App</p>
                          {
                            user ? 
                            <Link to="/"
                            className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                            Let's Work</Link>
                            :
                            <Link to="/login"
                            className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
                            Let's Explore</Link>
                          }
                        </div>
                        <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                            <div className="h-48 flex flex-wrap content-center">
                                <div>
                                    <img className="inline-block mt-28 hidden w-80 mr-5 xl:block" src={pg2} />

                                    {/* <img className="inline-block mt-28 hidden xl:block" src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"/>
                                     */}

                                </div>
                                <div>
                                    <img className="inline-block mt-24 md:mt-0 lg:ml-32 p-8 md:p-0 w-72" src={pg3} />
                                </div>
                                {/* <div>
                                    <img className="inline-block mt-28 hidden lg:block" src="https://user-images.githubusercontent.com/54521023/116969939-c1d5f180-acd4-11eb-8ad4-9ab9143bdb50.png"/></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;