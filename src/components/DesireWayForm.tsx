import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// FormSchema 类型
const FormSchema = z.object({
  direction: z.enum(["升学", "留学", "就业", "选调"], {
    required_error: "请选择一个就业方向。",
  }),
});

// Props 接口定义
interface DesireWayFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

export function DesireWayForm({ form }: DesireWayFormProps) {
  return (
    <div className="mb-6">
      <Card>
        <Card>
          <Form {...form}>
            <form className="m-3 space-y-6">
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-bold">
                      您的就业倾向为：
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="升学" />
                          </FormControl>
                          <FormLabel className="font-normal">升学</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="留学" />
                          </FormControl>
                          <FormLabel className="font-normal">留学</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="就业" />
                          </FormControl>
                          <FormLabel className="font-normal">就业</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="选调" />
                          </FormControl>
                          <FormLabel className="font-normal">选调</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </Card>
    </div>
  );
}
