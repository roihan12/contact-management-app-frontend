import { useDispatch, useSelector } from "react-redux";
import ContactList from "../components/ContactList";
import { useEffect, useState } from "react";
import {
  detailContact,
  setDeleteContact,
  setGetContactList,
} from "../features/contactSlice";
import ContactForm from "../components/ContactForm";
import Swal from "sweetalert2";
import { Button } from "flowbite-react";

const Contact = () => {
  const [openModal, setOpenModal] = useState(false);
  const data = useSelector((state) => state.contact.data);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);
  const dataDelete = useSelector((state) => state.contact.dataDelete);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: "Are you sure delete this contact?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setDeleteContact(id));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  useEffect(() => {
    dispatch(setGetContactList());
  }, [dispatch]);

  useEffect(() => {
    if (dataDelete) {
      Swal.fire({
        title: "Success !",
        text: dataDelete.message,
        icon: "success",
      });

      dispatch(setGetContactList());
    }
  }, [dataDelete, dispatch]);

  const handleClick = (contact) => {
    dispatch(detailContact(contact));
    setOpenModal(true);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ml-10">
      {/* <div className="sm:flex items-center justify-end">
        <Button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
          <p className="text-sm font-medium leading-none text-white">
            Add Task
          </p>
        </Button>
      </div> */}

      <Button
        onClick={() => {
          dispatch(
            detailContact({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              Addresses: [
                {
                  addressType: "",
                  street: "",
                  city: "",
                  province: "",
                  country: "",
                  zipcode: "",
                },
              ],
            })
          );
          setOpenModal(true);
        }}
      >
        New Contact
      </Button>
      <ContactForm show={openModal} onClose={() => setOpenModal(false)} />
      <ContactList
        data={data}
        loading={loading}
        error={error}
        handleDelete={handleDelete}
        handleClick={handleClick}
      />
    </div>
  );
};

export default Contact;
