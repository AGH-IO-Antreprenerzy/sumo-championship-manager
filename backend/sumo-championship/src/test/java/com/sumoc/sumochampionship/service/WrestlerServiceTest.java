package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.response.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.repository.WrestlerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WrestlerServiceTest {

    @Mock
    private WrestlerRepository wrestlerRepository;

    @InjectMocks
    private WrestlerService wrestlerService;

    /**
     * Test if return WrestlersDTO is created properly. This means:
     *      number of wrestlers in the page
     *      page number
     *      total elements
     */
    @Test
    public void WrestlersResponse_findAllInClubs(){
        int wrestlerNumber = 4;
        int pageLength = 2;
        int pageNo = 0;

        WebsiteUser user = new WebsiteUser();
        Club club = new Club();
        user.setOwnedClubs(Set.of(club));
        List<Wrestler> content = new ArrayList<>(wrestlerNumber);
        for(int i = 0; i < wrestlerNumber; i++){
            content.add(Wrestler.builder()
                            .firstname("Alex")
                            .lastname("A")
                            .gender(Gender.MALE)
                            .birthday(LocalDate.of(2002, 10, 24))
                            .build());
        }
        Pageable pageable = PageRequest.of(pageNo, pageLength);
        Page<Wrestler> wrestlerPage = new PageImpl<>(content.subList(0, 2));
        when(wrestlerRepository.findWrestlerByClubIn(Mockito.anyCollection(), Mockito.any())).thenReturn(wrestlerPage);


        WrestlersResponse wrestlersResponse = wrestlerService.findAllInClubs(user, pageable);
        System.out.println(wrestlersResponse.getWrestlersInfo());

        Assertions.assertEquals(pageLength, wrestlersResponse.getWrestlersInfo().size());
        Assertions.assertEquals(pageNo, wrestlersResponse.getPageNo());
        Assertions.assertEquals(pageLength, wrestlersResponse.getPageSize());
    }

}
