package server;

import static org.junit.Assert.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.messaging.simp.stomp.*;
import server.model.Message;
import server.model.MessageReceived;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import server.model.User;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageTest {

    @LocalServerPort
    private int port;

    private SockJsClient sockJsClient;

    private WebSocketStompClient stompClient;

    private final WebSocketHttpHeaders headers = new WebSocketHttpHeaders();

    @Before
    public void setup() {
        List<Transport> transports = new ArrayList<>();
        transports.add(new WebSocketTransport(new StandardWebSocketClient()));
        this.sockJsClient = new SockJsClient(transports);

        this.stompClient = new WebSocketStompClient(sockJsClient);
        this.stompClient.setMessageConverter(new MappingJackson2MessageConverter());
    }



    @Test
    public void receiveMessageTest() throws Exception {

        final CountDownLatch latch = new CountDownLatch(1);
        final AtomicReference<Throwable> failure = new AtomicReference<>();

        StompSessionHandler handler = new TestSessionHandler(failure) {

            @Override
            public void afterConnected(final StompSession session, StompHeaders connectedHeaders) {
                session.subscribe("/topic/messages", new StompFrameHandler() {
                    @Override
                    public Type getPayloadType(StompHeaders headers) {
                        return MessageReceived.class;
                    }

                    @Override
                    public void handleFrame(StompHeaders headers, Object payload) {
                        MessageReceived messageReceived = (MessageReceived) payload;
                        try {
                            assertEquals("Sender: Content", messageReceived.getSender()+": "+messageReceived.getContent());
                        } catch (Throwable t) {
                            failure.set(t);
                        } finally {
                            session.disconnect();
                            latch.countDown();
                        }
                    }
                });
                try {
                    session.send("/app/inbox", new Message("Sender", "Content"));
                } catch (Throwable t) {
                    failure.set(t);
                    latch.countDown();
                }
            }
        };

        this.stompClient.connect("ws://localhost:{port}/chat", this.headers, handler, this.port);

        if (latch.await(3, TimeUnit.SECONDS)) {
            if (failure.get() != null) {
                throw new AssertionError("", failure.get());
            }
        }
        else {
            fail("MessageReceived not received");
        }

    }

//    @Test
//    public void loginTest() throws Exception {
//
//        final CountDownLatch latch = new CountDownLatch(1);
//        final AtomicReference<Throwable> failure = new AtomicReference<>();
//
//        StompSessionHandler handler = new TestSessionHandler(failure) {
//
//            @Override
//            public void afterConnected(final StompSession session, StompHeaders connectedHeaders) {
//                session.subscribe("/topic/public", new StompFrameHandler() {
//                    @Override
//                    public Type getPayloadType(StompHeaders headers) {
//                        return User.class;
//                    }
//
//                    @Override
//                    public void handleFrame(StompHeaders headers, Object payload) {
//                        User user = (User) payload;
//                        try {
//                            assertEquals("user", user.getName());
//                        } catch (Throwable t) {
//                            failure.set(t);
//                        } finally {
//                            session.disconnect();
//                            latch.countDown();
//                        }
//                    }
//                });
//                try {
//                    session.send("/app/chat.addUser", new User("user"));
//                } catch (Throwable t) {
//                    failure.set(t);
//                    latch.countDown();
//                }
//            }
//        };
//
//        this.stompClient.connect("ws://localhost:{port}/chat", this.headers, handler, this.port);
//
//        if (latch.await(3, TimeUnit.SECONDS)) {
//            if (failure.get() != null) {
//                throw new AssertionError("", failure.get());
//            }
//        }
//        else {
//            fail("MessageReceived not received");
//        }
//
//    }


    private class TestSessionHandler extends StompSessionHandlerAdapter {

        private final AtomicReference<Throwable> failure;


        public TestSessionHandler(AtomicReference<Throwable> failure) {
            this.failure = failure;
        }

        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
            this.failure.set(new Exception(headers.toString()));
        }

        @Override
        public void handleException(StompSession s, StompCommand c, StompHeaders h, byte[] p, Throwable ex) {
            this.failure.set(ex);
        }

        @Override
        public void handleTransportError(StompSession session, Throwable ex) {
            this.failure.set(ex);
        }
    }
}
