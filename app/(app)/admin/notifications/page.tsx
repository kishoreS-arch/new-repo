
'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Send, Inbox, Pen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/language-context';

type RecipientGroup = 'Teachers' | 'Students' | 'Parents' | 'HODs';

interface SentMessage {
    id: string;
    recipients: RecipientGroup[];
    subject: string;
    body: string;
    timestamp: Date;
}

export default function NotificationsPage() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [selectedRecipients, setSelectedRecipients] = useState<RecipientGroup[]>([]);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
    const [isComposing, setIsComposing] = useState(true);

    const recipientGroups: RecipientGroup[] = ['Teachers', 'Students', 'Parents', 'HODs'];

    const handleRecipientChange = (group: RecipientGroup) => {
        setSelectedRecipients(prev => 
            prev.includes(group) ? prev.filter(r => r !== group) : [...prev, group]
        );
    };

    const handleSend = () => {
        if (selectedRecipients.length === 0 || !subject || !body) {
            toast({
                title: t('error'),
                description: t('fillAllFields'),
                variant: 'destructive',
            });
            return;
        }

        const newMessage: SentMessage = {
            id: `msg_${Date.now()}`,
            recipients: selectedRecipients,
            subject,
            body,
            timestamp: new Date(),
        }

        setSentMessages([newMessage, ...sentMessages]);

        toast({
            title: t('messageSent'),
            description: `${t('yourMessageHasBeenSentTo')}: ${selectedRecipients.join(', ')}.`,
        });

        // Reset form
        setSelectedRecipients([]);
        setSubject('');
        setBody('');
        setIsComposing(false);
    };

    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold tracking-tight">{t('notificationsCenter')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Inbox />
                                {t('mailbox')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full justify-start gap-2" onClick={() => setIsComposing(true)}>
                                <Pen className="h-4 w-4" />
                                {t('compose')}
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setIsComposing(false)}>
                                <Send className="h-4 w-4" />
                                {t('sent')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    {isComposing ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('composeNewMessage')}</CardTitle>
                                <CardDescription>{t('sendMessageToGroups')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>{t('recipients')}</Label>
                                    <div className="flex flex-wrap gap-4">
                                        {recipientGroups.map(group => (
                                            <div key={group} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={group} 
                                                    checked={selectedRecipients.includes(group)}
                                                    onCheckedChange={() => handleRecipientChange(group)}
                                                />
                                                <Label htmlFor={group}>{t(group.toLowerCase() as any)}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">{t('subject')}</Label>
                                    <Input 
                                        id="subject" 
                                        placeholder={t('enterMessageSubject')} 
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="body">{t('message')}</Label>
                                    <Textarea 
                                        id="body" 
                                        placeholder={t('typeYourMessageHere')} 
                                        rows={8} 
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="ml-auto" onClick={handleSend}>
                                    <Send className="mr-2 h-4 w-4" />
                                    {t('sendMessage')}
                                </Button>
                            </CardFooter>
                        </Card>
                    ) : (
                         <Card>
                            <CardHeader>
                                <CardTitle>{t('sentMessages')}</CardTitle>
                                <CardDescription>{t('sentCommunicationsHistory')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {sentMessages.length > 0 ? (
                                    sentMessages.map(msg => (
                                        <div key={msg.id}>
                                            <div className="flex items-start gap-4">
                                                 <Avatar>
                                                    <AvatarFallback>AD</AvatarFallback>
                                                </Avatar>
                                                <div className="w-full">
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-semibold">{msg.subject}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {msg.timestamp.toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{t('to')}: {msg.recipients.join(', ')}</p>
                                                    <p className="text-sm mt-2">{msg.body}</p>
                                                </div>
                                            </div>
                                            <Separator className="my-4" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted-foreground py-12">
                                        <Inbox className="mx-auto h-12 w-12" />
                                        <p>{t('noSentMessages')}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
