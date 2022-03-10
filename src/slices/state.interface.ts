import { IPendingTxn } from "./PendingTxnsSlice";
import { IAccountSlice } from "./AccountSlice";
import { IAppData } from "./AppSlice";
import { IBondDetails } from "./BondSlice";
// import { MessagesState } from "./MessagesSlice";
// import { IWrapSlice } from "./WrapThunk";

export interface IReduxState {
  pendingTransactions: IPendingTxn[];
  account: IAccountSlice;
  app: IAppData;
  bonding: IBondDetails;
  // messages: MessagesState;
  // wrapping: IWrapSlice;
}
