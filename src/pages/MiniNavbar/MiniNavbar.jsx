import { FaPhoneAlt } from "react-icons/fa";
import { BiMessageRoundedEdit } from "react-icons/bi";
import { BsQuestionOctagon } from "react-icons/bs";

const MiniNavbar = () => {
    return (
        <div className=" bg-cyan-950">
            <div className="max-w-[1050px] mx-auto hidden md:flex justify-between p-3">
                <p className="flex items-center gap-2 text-[14px] font-bold cursor-pointer"><FaPhoneAlt></FaPhoneAlt> 688768766</p>
                <p className="flex items-center gap-2 text-[14px] font-bold cursor-pointer"><BiMessageRoundedEdit></BiMessageRoundedEdit>Discover the Power of Nature with NaturoBD</p>
                <p className="flex items-center gap-2 text-[14px] font-bold cursor-pointer"><BsQuestionOctagon></BsQuestionOctagon>Customer Help</p>
            </div>
        </div>
    );
};

export default MiniNavbar;