import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/AcademicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAcademicSemesterQuery(undefined);

  console.log(data);

  return (
    <div>
      <h1>This is AcademicSemester</h1>
    </div>
  );
};

export default AcademicSemester;