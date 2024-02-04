import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyJwt } from "../utils/verifyJwt";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "jashamim12",
  //   },
  // });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "jashamim12",
  };

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (inpData: FieldValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: inpData.id,
        password: inpData.password,
      };

      const data = await login(userInfo).unwrap();

      const user = verifyJwt(data?.data?.accessToken) as TUser;

      dispatch(setUser({ user, token: data?.data?.accessToken }));
      toast.success("Login Success", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Login Failed", { id: toastId, duration: 2000 });
    }
  };

  if (error) {
    console.log(error);
    toast.error("Login Failed");
  }

  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        height: "100vh",
      }}
    >
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label={"ID:"} />
        <PHInput type="text" name="password" label={"Password:"} />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
