import axios from "axios";
import { call, put } from "redux-saga/effects";
import * as actions from "../actions/getAppointmentsActions";
import type { GetAppointmentsResponse } from "@/useCases/getAppointments";

export const controller = async (payload: any): Promise<unknown> => {
  try {
    const result = (
      await axios.get("https://localhost:7254/api/appointments", {params: {...payload}})
    );

    if (result.data.code !== 200) {
        throw new Error(result.data.message || "Erro desconhecido");
    }

    return { success: true, data: result.data.data, error: "" };
  } catch (error:any) {
    const message = error.response?.data?.message || error.message || "Erro desconhecido";
    return { success: false, data: {}, error: message };
  }
};

export function* GetAppointmentsSaga({ payload }: any) {
  try {
    const result: GetAppointmentsResponse = yield call(controller, payload);
    yield put(actions.GetAppointmentsSuccess(result.data));
  } catch (error: any) {
    yield put(actions.GetAppointmentsError(error.toString()));
  }
}