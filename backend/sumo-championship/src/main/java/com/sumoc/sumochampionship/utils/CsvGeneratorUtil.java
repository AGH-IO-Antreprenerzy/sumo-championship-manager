package com.sumoc.sumochampionship.utils;

import com.sumoc.sumochampionship.api.dto.enrollment.WrestlerEnrollmentDto;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class CsvGeneratorUtil {
    private static final String CSV_HEADER = "name, surname, club, category, gender, min age, max age, min weight, max weight\n";

    public byte[] generateCsvBytes(List<WrestlerEnrollmentDto> wrestlerEnrollmentDtos) {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (OutputStreamWriter writer = new OutputStreamWriter(outputStream, StandardCharsets.UTF_8)) {
            writer.write(CSV_HEADER);

            for (WrestlerEnrollmentDto wrestlerEnrollmentDto : wrestlerEnrollmentDtos) {
                writer.write(wrestlerEnrollmentDto.getName());
                writer.write(",");
                writer.write(wrestlerEnrollmentDto.getSurname());
                writer.write(",");
                writer.write(wrestlerEnrollmentDto.getClubName());
                writer.write(",");
                writer.write(wrestlerEnrollmentDto.getCategoryName());
                writer.write(",");
                writer.write(wrestlerEnrollmentDto.getGender().toString());
                writer.write(",");
                writer.write(String.valueOf(wrestlerEnrollmentDto.getMinAge()));
                writer.write(",");
                writer.write(String.valueOf(wrestlerEnrollmentDto.getMaxAge()));
                writer.write(",");
                writer.write(String.valueOf(wrestlerEnrollmentDto.getMinWeight()));
                writer.write(",");
                writer.write(String.valueOf(wrestlerEnrollmentDto.getMaxWeight()));
                writer.write("\n");
            }

            writer.flush();
            return outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return new byte[0];
        }
    }
}