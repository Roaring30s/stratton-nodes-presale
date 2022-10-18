import Image from "../components/Image";
export default function Custom404() {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-black font-sans">
      <Image
        src="/logo-with-text.svg"
        alt="Stratton Nodes Logo"
        width="317"
        height="55"
      />
      <h1 className="text-white text-lg mb-4">404 - Page Not Found</h1>
      <a
        className="hover:transition-all duration-300 ease-in-out bg-primary hover:bg-white text-white hover:text-primary font-bold py-3 px-7 border border-primary hover:border-transparent rounded-lg"
        target="_blank"
        rel="noreferrer"
        href="/"
      >
        Back to Presale
      </a>
    </div>
  );
}
