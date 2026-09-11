'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ComponentsPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold">Component Gallery</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
        <Card className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Button</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Input</h3>
            <Input placeholder="Type here..." />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Textarea</h3>
            <Textarea placeholder="Type message..." />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Checkbox</h3>
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <label htmlFor="terms">Accept terms and conditions</label>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Switch</h3>
            <div className="flex items-center gap-2">
              <Switch id="airplane-mode" />
              <label htmlFor="airplane-mode">Airplane Mode</label>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Slider</h3>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <Card className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Badge</h3>
            <div className="flex gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Progress</h3>
            <Progress value={60} />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Spinner</h3>
            <Spinner />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Skeleton</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Layout</h2>
        <Card className="p-6 space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-2">Tabs</h3>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">Accordion</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>
      </section>
    </div>
  );
}
