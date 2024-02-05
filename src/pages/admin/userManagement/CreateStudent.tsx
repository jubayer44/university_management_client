import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelect from "../../../components/form/PHSelect";
import { TResponse } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";

const studentDefaultValue = {
  name: {
    firstName: "Shamim",
    middleName: "Ahmed",
    lastName: "Jubayer",
  },
  gender: "male",
  // dateOfBirth: "1990-01-01",
  email: "jubayer443@gmail.com",
  contactNo: "1234567890332",
  emergencyContactNo: "9876543210",
  bloodGroup: "A+",
  presentAddress: "123 Main Street, City",
  permanentAddress: "456 Second Street, Town",

  guardian: {
    fatherName: "Father Name",
    fatherOccupation: "Father Occupation",
    fatherContactNo: "Father Contact",
    motherName: "Mother Name",
    motherOccupation: "Mother Occupation",
    motherContactNo: "Mother Contact",
  },

  localGuardian: {
    name: "Local Guardian Name",
    occupation: "Doctor",
    contactNo: "Local Guardian Contact",
    address: "Local Guardian Address",
  },

  admissionSemester: "656f5473a27219ae0c2fe086",
  academicDepartment: "656f55b0a27219ae0c2fe08f",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const bloodGroupOptions = bloodGroups.map((bloodGroup) => ({
  value: bloodGroup,
  label: bloodGroup,
}));

const CreateStudent = () => {
  const { data: sData, isLoading: sIsLoading } =
    useGetAcademicSemesterQuery(undefined);

  // const { data: dData } = useGetAcademicDepartmentsQuery(undefined, {
  //   skip: sIsLoading,
  // });

  const [addStudent] = useAddStudentMutation();
  const formData = new FormData();

  const semesterOptions =
    sData?.data?.map((s) => ({
      value: s?._id,
      label: `${s?.name} ${s?.year}`,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating student...");

    const studentData = {
      password: "jashamim",
      student: data,
    };

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data?.image);

    // console.log(Object.fromEntries(formData));

    try {
      const res = (await addStudent(formData)) as TResponse<TStudent>;
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Student created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create student", { id: toastId });
    }
  };

  return (
    <div>
      <h1>Create Student</h1>
      <Row>
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
            <Divider>Personal Info</Divider>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.firstName" label="First Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="name.middleName"
                  label="Middle Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.lastName" label="Last Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="gender"
                  label="Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="email" label="Email" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHDatePicker name="dateOfBirth" label="Date of Birth" />
              </Col>

              <Col>
                <Controller
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Picture">
                      <Input
                        value={value?.fileName}
                        type="file"
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    </Form.Item>
                  )}
                />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="contactNo" label="Contact No" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="emergencyContactNo"
                  label="Emergency Contact"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="bloodGroup"
                  label="Blood Group"
                  options={bloodGroupOptions}
                />
              </Col>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="presentAddress"
                  label="Present Address"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="permanentAddress"
                  label="Permanent Address"
                />
              </Col>

              <Divider>Guardian Info</Divider>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherName"
                  label="Father Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherOccupation"
                  label="Father Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.fatherContactNo"
                  label="Father Contact"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherName"
                  label="Mother Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherOccupation"
                  label="Mother Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="guardian.motherContactNo"
                  label="Mother Contact"
                />
              </Col>

              <Divider> Local Guardian Info</Divider>

              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.name"
                  label="Local Guardian Name"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.occupation"
                  label="Local Guardian Occupation"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.contactNo"
                  label="Local Guardian Contact"
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="localGuardian.address"
                  label="Local Guardian Address"
                />
              </Col>

              <Divider> Academic Info </Divider>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect
                  name="admissionSemester"
                  label="Admission Semester"
                  options={semesterOptions}
                  disabled={sIsLoading}
                />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput
                  type="text"
                  name="academicDepartment"
                  label="Academic Department"
                />
              </Col>
            </Row>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </div>
  );
};

export default CreateStudent;
