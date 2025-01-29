import '../css/Header.css';
import search from  '../images/search.webp';
import male from '../images/male.webp';
import arrow from '../images/angle-circle-down-icon.webp';
import electonics from '../images/computer-desktop-icon.webp';
import women from '../images/girl-icon.webp';
import furnitures from '../images/furniture-icon.webp';
import gift from '../images/present-icon.webp';
import beauty from '../images/cosmetics-icon.webp';
import mobile from '../images/smartphone-icon.webp';
import toys from '../images/horse-toys-icon.png'
export default function Header({isAuthenticated}) {
    const menuItems=[
        {label:'Cart',path:'/cart'},
        isAuthenticated ?{label:'wish list',path:'/wishlist'}:null,
        isAuthenticated ?{label:'profile',path:'/profile'}:null,
        isAuthenticated ?{label:'Logout',path:'/logout'}:{label:'Login',path:'/login'},
        !isAuthenticated ?{label:'Register',path:'/register'}:null,
        !isAuthenticated ?{label:'Contact',path:'/Contact'}:null,
    ]
    const filteredMenuItems = menuItems.filter(item => item !== null);
    return (
        <div>
            <header>
                <nav>
                    <div className="logo"><a href="/">Ecommerce Web App</a></div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search product" />
                        <img src={search} alt="profile"/>
                    </div>
                    <div className="user-options">
                       <div>
                            <a className="menu-profile" href="/">
                                <span>welcome profile<img className='icon' src={arrow} alt="icon"/></span>
                                <ul className="list-profile">
                                {filteredMenuItems.map((item,index)=>(
                                    <a href={item.path} ><li key={index}>{item.label}</li></a>
                                ))}
                                </ul>
                            </a>
                       </div>
                       <div>
                            <a href="/">order</a>
                       </div>
                       <div>
                            <a href="/">Help</a>
                       </div>
                    </div>
                </nav>
            </header>
            <aside className="sidebar">
                <ul>
                    <li ><img src={male} alt="image1"/></li>
                    <li ><img src={women} alt="image2"/></li>
                    <li><img src={mobile} alt="image3"/></li>
                    <li><img src={electonics} alt="image4"/></li>
                    <li><img src={furnitures}  alt="image5"/></li>
                    <li><img src={gift} alt="image6"/></li>
                    <li><img src={beauty} alt="image7"/></li>
                    <li><img src={toys} alt="image8"/></li>
                </ul>
            </aside>
        </div>
    );
}
