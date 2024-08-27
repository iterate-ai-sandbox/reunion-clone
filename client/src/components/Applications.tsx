import { RootState } from '@/store';
import mixpanel from 'mixpanel-browser';
import Sidebar from './ui/Sidebar';
import { FaAngleRight } from 'react-icons/fa6';
import { RiShareBoxLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableData {
  name: string;
  status: string;
  path: string;
}

function Applications() {
  const navigate = useNavigate();
  const isToggle = useSelector((state: RootState) => state.toggle.value);
  const tableData: TableData[] = [
    {
      name: "Account Console",
      status: "In use",
      path: "/realms/reunion/account",
    },
    {
      name: "Research",
      status: "In use",
      path: "/research/search",
    },
    {
      name: "Reunion",
      status: "In use",
      path: "/",
    },
  ];

  return (
    <>
      <div className="applications flex items-start">
        {isToggle ? (
          <div className="left absolute lg:relative z-[8]">
            <Sidebar />
          </div>
        ) : null}
        <div className="right py-5 px-7 opensans-semibold w-full">
          <p className="text-2xl">Applications</p>
          <p className="text-lg my-10">Manage you application permissions.</p>
          <div className="w-full">
            <Table className="w-full text-lg border-y-[1px] border-[#E4E4E7]">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left text-black"></TableHead>
                  <TableHead className="text-left text-black">Name</TableHead>
                  <TableHead className="text-left text-black">
                    Application type
                  </TableHead>
                  <TableHead className="text-left text-black">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-[#026FFA]">
                      <FaAngleRight className="text-gray-400" fontSize={16} />
                    </TableCell>
                    <div
                      onClick={() => {
                        mixpanel.track("application selected", {
                          "application display name": data.name,
                          "application display status": data.status,
                        });
                        navigate(data.path);
                      }}
                      className="flex items-center gap-1 h-20 cursor-pointer group w-fit"
                    >
                      <TableCell className="font-medium flex items-center gap-2 text-[#026FFA] group-hover:text-blue-800">
                        {data.name}
                      </TableCell>
                      <RiShareBoxLine
                        className="text-[#026FFA] group-hover:text-blue-800"
                        fontSize={18}
                      />
                    </div>
                    <TableCell>Internal</TableCell>
                    <TableCell>{data.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Applications;
