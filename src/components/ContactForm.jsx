import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddContact,
  setGetContactList,
  setUpdateContact,
} from "../features/contactSlice";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const ContactForm = (props) => {
  const firstNameInputRef = useRef(null);

  const dataAdd = useSelector((state) => state.contact.dataAdd);
  const errorAdd = useSelector((state) => state.contact.errorAdd);
  const loading = useSelector((state) => state.contact.loading);

  const dataVal = useSelector((state) => state.contact.dataVal);
  const dataUpdate = useSelector((state) => state.contact.dataUpdate);
  const errorEdit = useSelector((state) => state.contact.errorEdit);

  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      addressType: "",
      street: "",
      city: "",
      province: "",
      country: "",
      zipcode: "",
    },
  ]);

  const [inputData, setInputData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Addresses: data,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputData.Addresses = data;

    if (inputData.contactId) {
      // update the contact
      dispatch(setUpdateContact(inputData));
    } else {
      // add the contact
      dispatch(setAddContact(inputData));
    }
  };

  const handleClick = () => {
    setData([
      ...data,
      {
        addressType: "",
        street: "",
        city: "",
        province: "",
        country: "",
        zipcode: "",
      },
    ]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...data];
    onChangeVal[i][name] = value;
    setData(onChangeVal);
  };

  const handleDelete = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };

  const displaySuccessMessage = (message) => {
    Swal.fire({
      title: "Success !",
      text: message,
      icon: "success",
    });
  };
  const displayErrorMessage = (error) => {
    Swal.fire({
      title: "Error !",
      text: error,
      icon: "error",
    });
  };

  useEffect(() => {
    if (dataAdd) {
      displaySuccessMessage(dataAdd.message);
      dispatch(setGetContactList());
      setData([
        {
          addressType: "",
          street: "",
          city: "",
          province: "",
          country: "",
          zipcode: "",
        },
      ]);

      setInputData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        Addresses: [],
      });
    }

    if (errorAdd) {
      displayErrorMessage(errorAdd);
    }
  }, [dataAdd, errorAdd, dispatch]);

  useEffect(() => {
    if ((!loading && dataAdd) || (!loading && dataUpdate)) {
      props.onClose();
    }
  }, [loading, dataAdd, dataUpdate, props]);

  useEffect(() => {
    if (dataVal) {
      const mappedArray = dataVal.Addresses.map(
        ({ addressType, street, city, province, country, zipcode }) => {
          return { addressType, street, city, province, country, zipcode };
        }
      );

      setData(mappedArray);
      setInputData((prevInputData) => ({ ...prevInputData, ...dataVal }));
    }
  }, [dataVal]);

  useEffect(() => {
    if (dataUpdate) {
      displaySuccessMessage(dataUpdate.message);
      dispatch(setGetContactList());

      setData([
        {
          addressType: "",
          street: "",
          city: "",
          province: "",
          country: "",
          zipcode: "",
        },
      ]);

      setInputData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        Addresses: [],
      });
    }
    if (errorEdit) {
      displayErrorMessage(errorEdit);
    }
  }, [dataUpdate, errorEdit, dispatch]);

  return (
    <>
      <Modal
        {...props}
        popup
        initialFocus={firstNameInputRef}
        className="min-h-screen p-6 bg-gray-500 flex items-center justify-center"
      >
        <Modal.Header>
          {" "}
          {inputData.contactId ? "Update Contact" : "Add New Contact"}{" "}
        </Modal.Header>
        <Modal.Body className="max-w-screen-lg mx-auto mt-5">
          <form onSubmit={handleSubmit}>
            <div className="lg:col-span-4">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                <div className="md:col-span-5">
                  <Label value="First Name" />
                  <TextInput
                    id="firstName"
                    ref={firstNameInputRef}
                    placeholder="John"
                    value={inputData.firstName}
                    required
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-5">
                  <Label value="Last Name" />
                  <TextInput
                    id="lastName"
                    placeholder="Doe"
                    value={inputData.lastName}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="md:col-span-5">
                  <Label value="Email Address" />
                  <TextInput
                    id="email"
                    type="email"
                    value={inputData.email}
                    placeholder="example@example.com"
                    required
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="md:col-span-5">
                  <Label value="Phone" />
                  <TextInput
                    id="phone"
                    type="text"
                    value={inputData.phone}
                    placeholder="example@example.com"
                    required
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="md:col-span-5">
                  <Button onClick={handleClick}>Add Address</Button>
                </div>

                {data.map((val, i) => (
                  <div className="lg:col-span-4" key={i}>
                    <h4 className="text-base font-bold text-center mb-4 leading-none">
                      {" "}
                      Address {i + 1}
                    </h4>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                      <div className="md:col-span-1 mt-5 ">
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => handleDelete(i)}
                        >
                          <MdOutlineDelete className=" h-5 w-5" />
                        </Button>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Address Type</Label>
                        <TextInput
                          type="text"
                          name="addressType"
                          id="addressType"
                          value={val.addressType}
                          placeholder="Home, Office, or.."
                          title="Home, Office, or.."
                          onChange={(e) => handleChange(e, i)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label>City</Label>
                        <TextInput
                          type="text"
                          name="city"
                          id="city"
                          value={val.city}
                          placeholder="D'Amoreborough"
                          title="D'Amoreborough"
                          onChange={(e) => handleChange(e, i)}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <Label>Street</Label>
                        <TextInput
                          type="text"
                          name="street"
                          id="street"
                          value={val.street}
                          placeholder="87360 Dylan Parks"
                          title="87360 Dylan Parks"
                          onChange={(e) => handleChange(e, i)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label>Country / region</Label>
                        <div>
                          <TextInput
                            name="country"
                            id="country"
                            placeholder="USA"
                            title="USA"
                            value={val.country}
                            onChange={(e) => handleChange(e, i)}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label>State / province</Label>
                        <div>
                          <TextInput
                            name="province"
                            id="province"
                            placeholder="Oregon"
                            title="Oregon"
                            value={val.province}
                            onChange={(e) => handleChange(e, i)}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <Label>Zipcode</Label>
                        <TextInput
                          type="text"
                          name="zipcode"
                          id="zipcode"
                          placeholder="11988-8420"
                          title="11988-8420"
                          value={val.zipcode}
                          onChange={(e) => handleChange(e, i)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 text-right mt-5">
              <div className="inline-flex items-end">
                <Button isProcessing={loading} type="submit">
                  {" "}
                  {loading ? "" : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ContactForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ContactForm;
