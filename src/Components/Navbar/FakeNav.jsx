import logo from "../../assets/Logo2.png";
import { navigation } from "../../data";
import NavMobile from "./NavMobile";

const fakeNav = () => {
  return (
    <nav className="container ">
      <div className="flex justify-between items-center mx-auto bg-gradient-to-r from-[#3BA29B] to-[#E4FDE5] pt-[2rem] pb-[1rem] px-10 w-[100vw]">
        <div className="flex justify-start items-center">
          <img
            className="logo w-[80px] h-[36px] max-w-none"
            src={logo}
            alt="logo"
          />
        </div>
        {/* desktop navbar */}
        <ul className="hidden lg:flex lg:items-center gap-x-10 text-sm md:text-[1rem] xl:text-[1.1rem] text-textWhite ">
          {navigation.map((navItem, index) => {
            const { href, title } = navItem;
            return (
              <li key={index}>
                <a
                  href={href}
                  className="flex items-center gap-1 hover:text-black transition-all"
                >
                 
                  {title}
                </a>
              </li>
            );
          })}
         
        </ul>

        <button
          className="hidden lg:flex custom__button hover:bg-gradient-to-r from-[#68baaf] to-[#95bbb2]  mr-12"
          type="submit"
        >
          Notify Me
        </button>
        <NavMobile />
      </div>
    </nav>
  );
};

export default fakeNav;
