import { Radio } from "antd";

function QuestionAnswer({ options, answer }: any) {
  return (
    <div>
      {options && options.length > 0 ? (
        <>
          {options.map((option: any, index: any) => (
            // <Radio.Group value={answer} key={index}>
            <Radio key={option._id} value={option.option}>
              {option.option}
            </Radio>
            // </Radio.Group>
          ))}
        </>
      ) : (
        <p>{answer}</p>
      )}
    </div>
  );
}

export default QuestionAnswer;
