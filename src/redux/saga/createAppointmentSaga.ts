import axios from "axios";
import { call, put } from "redux-saga/effects";
import * as actions from "../actions/createAppointment";
import type { CreateAppointmentResponse } from "@/useCases/createAppointment";

export const controller = async (payload: any): Promise<unknown> => {
  try {
    const result = (
      await axios.post("https://localhost:7254/api/appointments", {...payload})
    )

    if (result.data.code !== 200) {
        throw new Error(result.data.message || "Erro desconhecido");
    }

    return { success: true, data: result.data.data, error: "" };
    
  } catch (error:any) {
    const message = error.response?.data?.message || error.message || "Erro desconhecido";
    return { success: false, data: {}, error: message };
  }

};

export function* CreateAppointmentSaga({ payload }: any) {
  try {
    const result: CreateAppointmentResponse = yield call(controller, payload);
    yield put(actions.CreateAppointmentSuccess(result.data));
  } catch (error: any) {
    yield put(actions.CreateAppointmentError(error.toString()));
  }
}