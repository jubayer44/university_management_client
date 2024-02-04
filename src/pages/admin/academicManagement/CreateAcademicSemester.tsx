import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constans/semester";
import { monthOptions, yearOptions } from "../../../constans/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating semester...");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester created successfully", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create semester", { id: toastId });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Welcome to the CreateAcademicSemester page
      </h2>
      <Flex align="center" justify="center">
        <Col span={6}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect label="Name" name="name" options={semesterOptions} />
            <PHSelect label="Year" name="year" options={yearOptions} />
            <PHSelect
              label="Start Month"
              name="startMonth"
              options={monthOptions}
            />
            <PHSelect
              label="End Month"
              name="endMonth"
              options={monthOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicSemester;
