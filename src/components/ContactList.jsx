import { Button, Card, Table } from "flowbite-react";
import PropTypes from "prop-types";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

const ContactList = ({ data, loading, error, handleDelete, handleClick }) => {
  return (
    <div className="overflow-x-auto mt-5">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data ? (
            data.map((item, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item?.fullName}
                </Table.Cell>
                <Table.Cell>{item?.email}</Table.Cell>
                <Table.Cell>{item?.phone}</Table.Cell>

                <Table.Cell>
                  <Button
                    size="xs"
                    color="info"
                    className="mb-3"
                    onClick={() => handleClick(item)}
                  >
                    <MdOutlineEdit className="h-5 w-5" />
                  </Button>

                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => handleDelete(item?.contactId)}
                  >
                    <MdOutlineDelete className=" h-5 w-5" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : loading ? (
            <div
              role="status"
              className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <Card className="max-w-sm">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {error ? error : " data empty"}
              </p>
            </Card>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

ContactList.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ContactList;
