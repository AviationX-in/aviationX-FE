const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="w-[90%] mx-auto flex justify-between items-start py-4">
        <div className="">
          <h1 className="text-lg font-bold">AviationX.in</h1>
          <h1>Registered Office Address: </h1>
          <p className="py-4 text-md">
            7/28 U Block, In Front of DLF Phase III Metro Station, <br />
            Gurugram, Haryana - 122002, India <br />
            GSTIN/UIN: 06ABRFA7820N1ZW <br />
            Karnataka, India <br />
            Telephone : +91 8088867130
          </p>
        </div>
        <div className="">
          <h1 className="text-lg font-bold">Company</h1>
          <ul>
            <li className="py-2">About Us</li>
            <li className="py-2">Contact Us</li>
          </ul>
        </div>
        <div className=""></div>
      </div>
      <div className="py-2 text-center">
        Copyright &copy; {getYear()} AviationX. All rights reserved
      </div>
    </div>
  );
};
export default Footer;
