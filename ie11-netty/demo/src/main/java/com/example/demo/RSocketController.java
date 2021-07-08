package com.example.demo;

import java.time.Duration;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

@Controller
public class RSocketController {

    @MessageMapping("interval-stream")
    public Flux<Long> intervalStream(Data test) {
      System.out.println(test.yo);
      Flux<Long> fluxOne = Flux.just(-5L, -4L, -3L, -2L);
      Flux<Long> fluxTwo = Flux.just(-1L);
      Flux<Long> fluxThree = Flux.interval(Duration.ofSeconds(1));
      return Flux.concat(fluxOne, fluxTwo, fluxThree);
    }


}
