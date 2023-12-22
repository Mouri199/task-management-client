import logo from '/Logo2-removebg-preview.png'

const Footer = () => {
    return (
        <div>
            <footer className="footer lg:flex items-center justify-around p-10 bg-[#04364A] text-neutral-content">
                <aside>
                    <div className='flex  items-center '>
                        <img className='w-20 lg:ml-0 ml-16 lg:w-52' src={logo} alt="" />
                        <p className="text-[#DAFFFB] lg:mb-5 text-xl lg:text-2xl">Techno Vision Ltd.<br />Providing reliable tech since 1992</p>
                    </div>
                </aside>
                <nav className='lg:block hidden'>
                    <header className="footer-title text-[#DAFFFB] lg:text-2xl">Social</header>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://www.linkedin.com/in/shanjida-moury-ba1b44284/'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                        <a href='https://youtu.be/D_-rmRa1JRc?si=kFC3QK1aC4pCpt-x'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
                        <a href='https://www.facebook.com/mouri1999s'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" /></svg></a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;