'use client';

import { MessageCircle, Send, Bot, User } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useFormStatus } from 'react-dom';
import { getChatbotAnswer } from '@/app/actions';
import { useEffect, useRef, useState, useActionState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

const initialState = {
  message: '',
  answer: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      <Send className="h-4 w-4" />
    </Button>
  );
}

export function Chatbot() {
  const [state, formAction] = useActionState(getChatbotAnswer, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message === 'success' && state.answer) {
      setMessages((prev) => [...prev, { role: 'bot', content: state.answer }]);
      formRef.current?.reset();
    }
  }, [state]);

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query.trim()) {
      setMessages((prev) => [...prev, { role: 'user', content: query }]);
      formAction(formData);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>AI Assistant</SheetTitle>
          <SheetDescription>
            Ask questions about syllabus, exam dates, or attendance.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg bg-muted p-3 text-sm">
                <p>Hello! How can I help you today?</p>
              </div>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'bot' && (
                  <Avatar>
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {useFormStatus().pending && (
                <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-muted p-3 text-sm w-full">
                        <Skeleton className="h-4 w-1/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
             )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <form
            ref={formRef}
            action={handleFormSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              name="query"
              placeholder="Type your question..."
              className="flex-1"
              disabled={useFormStatus().pending}
            />
            <SubmitButton />
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
