export default function Circles() {
  return (
    <>
      <div className="absolute -bottom-[6rem] -left-[100px] z-10 ">
        <span className="w-[15rem] h-[15rem] bg-[#6A6AFF] block rounded-full blur-3xl opacity-75"></span>
      </div>
      <div className="absolute w-full h-full -top-[5rem] overflow-hidden overflow-y-visible z-10">
        <span className="absolute top-12 -right-28 w-[14rem] h-[14rem] bg-[#E4E728] block rounded-full blur-3xl opacity-75"></span>
        <div className="absolute -top-[75px] -right-[100px] z-10"></div>
      </div>
    </>
  );
}
