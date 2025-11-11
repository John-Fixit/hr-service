// ============================================
// 2. DraggableFormElement.jsx
// ============================================
import { MdDragIndicator, MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Checkbox, Rate, Select } from "antd";

const DraggableFormElement = ({
  element,
  index,
  onEdit,
  onRemove,
  isDragging,
  isDraggedOver,
  componentRole,
}) => {
  const nonLabelElements = ["submit", "header", "paragraph"];

  const renderPreview = () => {
    switch (element?.type) {
      case "header":
        return (
          <h2 className="text-2xl font-bold text-gray-800">{element?.label}</h2>
        );
      case "paragraph":
        return <p className="text-gray-600">{element?.label}</p>;
      case "text":
        return (
          <Input
            type="text"
            placeholder={element?.placeholder}
            className="w-full"
            size="large"
            disabled
          />
        );
      case "textarea":
        return (
          <Textarea
            rows={4}
            placeholder={element?.placeholder}
            className="w-full"
            disabled
          />
        );
      case "checkbox":
        return <Checkbox.Group options={element?.options} disabled />;
      case "radio":
        return (
          <Radio.Group disabled>
            {element?.options?.map((option, i) => (
              <Radio key={i} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "select":
        return (
          <Select
            options={element?.options}
            size="large"
            className="w-full"
            disabled
          />
        );
      case "rate":
        return <Rate disabled />;
      case "submit":
        return (
          <Button className="bg-blue-500 text-white" radius="sm" size="sm">
            {element?.label}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-lg border transition-all ${
        isDragging ? "opacity-50" : ""
      } ${
        isDraggedOver
          ? "border-2 border-blue-400 border-dashed"
          : "border-gray-200"
      } hover:shadow-md p-4`}
    >
      {/* Drag Handle */}
      {componentRole !== "edit" && (
        <div className="absolute left-2 top-4 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
          <MdDragIndicator className="text-gray-400" size={20} />
        </div>
      )}

      {/* Action Buttons */}
      {componentRole !== "edit" && (
        <div className="absolute right-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <Button
            isIconOnly
            size="sm"
            type="button"
            variant="flat"
            onPress={onEdit}
          >
            <MdModeEdit size={18} color="blue" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            type="button"
            variant="flat"
            onPress={onRemove}
          >
            <MdDeleteOutline size={18} color="red" />
          </Button>
        </div>
      )}

      {/* Element Content */}
      <div className={componentRole !== "edit" ? "ml-6 mr-16" : ""}>
        {!nonLabelElements.includes(element?.type) && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {element?.label}
            {element?.isRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}
        {renderPreview()}
      </div>
    </div>
  );
};

export default DraggableFormElement;
