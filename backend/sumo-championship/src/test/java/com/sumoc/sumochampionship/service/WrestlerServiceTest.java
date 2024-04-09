package com.sumoc.sumochampionship.service;

import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersDto;
import com.sumoc.sumochampionship.api.dto.wrestler.WrestlersResponse;
import com.sumoc.sumochampionship.db.people.Club;
import com.sumoc.sumochampionship.db.people.Gender;
import com.sumoc.sumochampionship.db.people.WebsiteUser;
import com.sumoc.sumochampionship.db.people.Wrestler;
import com.sumoc.sumochampionship.db.season.Category;
import com.sumoc.sumochampionship.repository.CategoryRepository;
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
import java.util.*;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WrestlerServiceTest {

    @Mock
    private CategoryRepository categoryRepository;
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
        // Arrange
        int wrestlerNumber = 4;
        int pageLength = 2;
        int pageNo = 0;

        WebsiteUser user = new WebsiteUser();
        Club club = Club.builder()
                .name("c")
                .id(1L)
                .nationality("Poland")
                .build();
        user.setOwnedClubs(Set.of(club));
        List<Wrestler> content = new ArrayList<>(wrestlerNumber);
        for(int i = 0; i < wrestlerNumber; i++){
            content.add(Wrestler.builder()
                            .firstname("Alex")
                            .lastname("A")
                            .gender(Gender.MALE)
                            .birthday(LocalDate.of(2002, 10, 24))
                            .club(club)
                            .build());
        }
        Pageable pageable = PageRequest.of(pageNo, pageLength);
        Page<Wrestler> wrestlerPage = new PageImpl<>(content.subList(0, 2));
        when(wrestlerRepository.findWrestlerByClubIn(Mockito.anyCollection(), Mockito.any())).thenReturn(wrestlerPage);

        // Act
        WrestlersResponse wrestlersResponse = wrestlerService.findAllInClubs(user, pageable);
        System.out.println(wrestlersResponse.getWrestlersInfo());

        // Assert
        Assertions.assertEquals(pageLength, wrestlersResponse.getWrestlersInfo().size());
        Assertions.assertEquals(pageNo, wrestlersResponse.getPageNo());
        Assertions.assertEquals(pageLength, wrestlersResponse.getPageSize());
    }

    @Test
    public void filterWrestlerToCategoryAge(){
        // Arrange

        long senior_id = 1;
        long junior_id = 2;
        int juniorWrestlerNo = 10;
        int seniorWrestlerNo = 3;
        int midWrestlerNo = 7;

        Category senior = Category.builder()
                .minAge(70)
                .maxAge(100)
                .gender(Gender.ALL)
                .build();
        Category junior = Category.builder()
                .minAge(14)
                .maxAge(18)
                .gender(Gender.ALL)
                .build();

        Club club1 = Club.builder().build();



        List<Wrestler> wrestlers = new ArrayList<>();
        for(int i = 0; i < juniorWrestlerNo; i++){
            wrestlers.add(Wrestler.builder()
                            .club(club1)
                            .birthday(LocalDate.now().minusYears(17))
                            .build());
        }

        for(int i = 0; i < seniorWrestlerNo; i++){
            wrestlers.add(Wrestler.builder()
                    .club(club1)
                    .birthday(LocalDate.now().minusYears(75))
                    .build());
        }

        for(int i = 0; i < midWrestlerNo; i++){
            wrestlers.add(Wrestler.builder()
                    .club(club1)
                    .birthday(LocalDate.now().minusYears(35))
                    .build());
        }

        WebsiteUser user = WebsiteUser.builder().build();
        when(categoryRepository.findById(senior_id)).thenReturn(Optional.of(senior));
        when(categoryRepository.findById(junior_id)).thenReturn(Optional.of(junior));
        when(wrestlerRepository.findAllByClubIn(Mockito.any())).thenReturn(wrestlers);

        // Act
        List<WrestlersDto> seniorWrestlers = wrestlerService.filterWrestler(user, senior_id);
        List<WrestlersDto> juniorWrestlers = wrestlerService.filterWrestler(user, junior_id);


        // Assert
        Assertions.assertEquals(seniorWrestlerNo, seniorWrestlers.size());
        Assertions.assertEquals(juniorWrestlerNo, juniorWrestlers.size());
    }

    @Test
    public void filterWrestlerToCategoryGender(){
        // Arrange

        long male_id = 1;
        long female_id = 2;
        int maleWrestlerNo = 10;
        int femaleWrestlerNo = 3;

        Category male = Category.builder()
                .minAge(1)
                .maxAge(100)
                .gender(Gender.MALE)
                .build();
        Category female = Category.builder()
                .minAge(1)
                .maxAge(100)
                .gender(Gender.FEMALE)
                .build();

        Club club1 = Club.builder().build();



        List<Wrestler> wrestlers = new ArrayList<>();
        for(int i = 0; i < maleWrestlerNo; i++){
            wrestlers.add(Wrestler.builder()
                    .club(club1)
                    .birthday(LocalDate.now().minusYears(17))
                    .gender(Gender.MALE)
                    .build());
        }

        for(int i = 0; i < femaleWrestlerNo; i++){
            wrestlers.add(Wrestler.builder()
                    .club(club1)
                    .birthday(LocalDate.now().minusYears(75))
                    .gender(Gender.FEMALE)
                    .build());
        }


        WebsiteUser user = WebsiteUser.builder().build();
        when(categoryRepository.findById(male_id)).thenReturn(Optional.of(male));
        when(categoryRepository.findById(female_id)).thenReturn(Optional.of(female));
        when(wrestlerRepository.findAllByClubIn(Mockito.any())).thenReturn(wrestlers);

        // Act
        List<WrestlersDto> maleWrestlers = wrestlerService.filterWrestler(user, male_id);
        List<WrestlersDto> femaleWrestlers = wrestlerService.filterWrestler(user, female_id);


        // Assert
        Assertions.assertEquals(maleWrestlerNo, maleWrestlers.size());
        Assertions.assertEquals(femaleWrestlerNo, femaleWrestlers.size());
    }

}
