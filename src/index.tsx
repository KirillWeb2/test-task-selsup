import { Component } from "react";
import ReactDOM from "react-dom/client";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues.slice(),
    };
  }

  handleChange = (paramId: number, value: string) => {
    const updatedParamValues = this.state.paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );
    this.setState({ paramValues: updatedParamValues });
  };

  getModel = (): Model => {
    return {
      paramValues: this.state.paramValues,
      colors: this.props.model.colors,
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={
                paramValues.find((p) => p.paramId === param.id)?.value || ""
              }
              onChange={(e) => this.handleChange(param.id, e.target.value)}
            />
          </div>
        ))}
        <button onClick={() => console.log(this.getModel())}>getModel</button>
      </div>
    );
  }
}
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const model: Model = {
  colors: [],
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

root.render(<ParamEditor model={model} params={params} />);
