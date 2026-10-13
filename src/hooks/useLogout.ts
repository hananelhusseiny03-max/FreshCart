import { useDispatch } from "react-redux";
import { setAuthInfo } from "@/app/features/authen/store/store.slice";
import { clearToken } from "@/app/features/authen/server/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await clearToken();

    dispatch(setAuthInfo({ isAuthenticated: false, userInfo: null }));
    toast.success('Logged out secessfully');

    router.push("/login");

    router.refresh();
  };

  return { logout };
}