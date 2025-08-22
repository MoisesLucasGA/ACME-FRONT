import axios from "axios";
import { call, put } from "redux-saga/effects";
import * as actions from "../actions/getPatientsActions";
import type { GetPatientsResponse } from "@/useCases/getPatient";

export const controller = async (payload: any): Promise<unknown> => {
  try {
    const result = (
    
      await axios.get("https://localhost:7254/api/patients", {params: {...payload}})
    ).data.data;

    return { success: true, data: result, error: "" };
  } catch (error) {
    return { success: false, data: {}, error: error };
  }
};

export function* GetPatientSaga({ payload }: any) {
  try {
    const result: GetPatientsResponse = yield call(controller, payload);
    yield put(actions.GetPatientsSuccess(result.data));
  } catch (error: any) {
    yield put(actions.GetPatientsError(error.toString()));
  }
}