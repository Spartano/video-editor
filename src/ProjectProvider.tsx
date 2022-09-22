import React, {
  ReactNode,
  MouseEvent,
  useMemo,
  useReducer,
  createContext,
  useContext,
} from "react";

type ProjectProviderProps = {
  children: ReactNode;
};

type State = {
  fraudType: string;
};

type Actions = { type: "updateFraudType"; fraudType: string };

type API = {
  updateFraudType: (fraudType: string) => void;
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "updateFraudType": {
      return {
        ...state,
        fraudType: action.fraudType,
      };
    }
    default:
      return state;
  }
};

export const ProjectDataContext = createContext<State>({} as State);
export const ProjectAPIContext = createContext<API>({} as API);

const ProjectProvider = (props: ProjectProviderProps) => {
  const { children } = props;
  // state logic
  const [state, dispatch] = useReducer(reducer, { fraudType: "nao" } as State);

  const api = useMemo(() => {
    const updateFraudType = (fraudType: string) => {
      dispatch({ type: "updateFraudType", fraudType });
    };

    return {
      updateFraudType,
    };
    // no more dependency on state! The api value will stay the same
  }, []);

  return (
    <ProjectAPIContext.Provider value={api}>
      <ProjectDataContext.Provider value={state}>
        {children}
      </ProjectDataContext.Provider>
    </ProjectAPIContext.Provider>
  );
};

export default ProjectProvider;

export const useProjectAPI = () => useContext(ProjectAPIContext);
export const useProjectData = () => useContext(ProjectDataContext);
